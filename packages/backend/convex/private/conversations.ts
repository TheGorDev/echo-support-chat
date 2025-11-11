import {query} from "@workspace/backend/_generated/server.js"
import {ConvexError, v} from "convex/values"
import {supportAgent} from "@workspace/backend/system/ai/agents/supportAgent.js"
import { MessageDoc } from "@convex-dev/agent"
import { paginationOptsValidator, PaginationResult } from "convex/server"
import { Doc } from "@workspace/backend/_generated/dataModel.js"

export const getOne = query(
    {
        args:{
            conversationId: v.id("conversations")
        },
        handler: async (ctx, args) => {
            const identity = await ctx.auth.getUserIdentity()
            if(identity === null) {
                throw new ConvexError({code: "UNATHORIZED", message: "Identity not found"})
            }

            const orgId = identity.orgId as string;
            if(orgId === null) {
                throw new ConvexError({code: "UNATHORIZED", message: "Organization not found"})
            }

            const conversationId = args.conversationId;
            if(!conversationId) {
                throw new ConvexError({code: "NOT_FOUND", message: "Conversation is required"})
            }

            const conversation = await ctx.db.get(conversationId)
            if(!conversation) {
                throw new ConvexError({code: "NOT_FOUND", message: "Conversation not found"})
            }
            if(conversation.organizationId != identity.orgId) {
                throw new ConvexError({code: "UNATHORIZED", message: "Invalid organization id"})
            }

            const contactSession = await ctx.db.get(conversation.contactSessionId)
            if(!contactSession) {
                throw new ConvexError({code: "NOT_FOUND", message: "Contact session not found"})
            }

            return {
                ...conversation,
                contactSession
            }
        }
    }
)

export const getMany = query({
    args: {
        paginationOpts: paginationOptsValidator,
        status: v.optional(v.union(
            v.literal("resolved"),
            v.literal("unresolved"),
            v.literal("escalated")
        ))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if(identity === null) {
            throw new ConvexError({code: "UNATHORIZED", message: "Identity not found"})
        }

        const orgId = identity.orgId as string;
        if(orgId === null) {
            throw new ConvexError({code: "UNATHORIZED", message: "Organization not found"})
        }

        let conversations: PaginationResult<Doc<"conversations">>

        if(args.status) {
            conversations = await ctx.db.query("conversations")
            .withIndex("by_status_and_organization_id", q => 
                q
                .eq("status", args.status as Doc<"conversations">["status"])
                .eq("organizationId", orgId)
            )
            .order("desc")
            .paginate(args.paginationOpts)
        } else {
            conversations = await ctx.db.query("conversations")
            .withIndex("by_organization_id", q => 
                q.eq("organizationId", orgId)
            )
            .order("desc")
            .paginate(args.paginationOpts)
        }

        const conversationsWithAdditionalData = await Promise.all(
            conversations.page.map(async conversation => {
                let lastMessage: MessageDoc | null = null
                let contactSession = await ctx.db.get(conversation.contactSessionId)
                if(!contactSession) {
                    return null;
                }
                const messages = await supportAgent.listMessages(ctx,{
                    threadId: conversation.threadId,
                    paginationOpts: {numItems: 1, cursor: null}
                })

                 if(messages.page.length > 0) {
                    lastMessage = messages.page[0] ?? null
                 }

                 return {
                    ...conversation,
                    lastMessage,
                    contactSession
                 }
            })
        )
        const validConversations =  conversationsWithAdditionalData.filter((conv): conv is NonNullable<typeof conv> => conv !== null)

        return {
            ...conversations,
            page: validConversations
        }
    }
})