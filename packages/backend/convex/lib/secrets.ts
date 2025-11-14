import {
    CreateSecretCommand,
    GetSecretValueCommand,
    type GetSecretValueCommandOutput,
    PutSecretValueCommand,
    ResourceExistsException,
    SecretsManagerClient
} from "@aws-sdk/client-secrets-manager"

/**
 * Create an AWS Secrets Manager client configured from environment variables.
 *
 * @returns A `SecretsManagerClient` configured with `region` taken from `AWS_REGION` and credentials from `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` (empty strings if unset).
 */
export function createSecretsManagerClient(): SecretsManagerClient {
    return new SecretsManagerClient({
        region: process.env.AWS_REGION || "",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
        }
    })
}

/**
 * Fetches the Secrets Manager secret value for the specified secret name.
 *
 * @param secretName - The name or ARN of the secret to retrieve
 * @returns The secret value response from AWS Secrets Manager as a `GetSecretValueCommandOutput`
 */
export async function getSecretValue(secretName: string): Promise<GetSecretValueCommandOutput> {
    const client = createSecretsManagerClient();
    return await client.send(new GetSecretValueCommand({SecretId: secretName}))
}

/**
 * Creates a new secret in AWS Secrets Manager or updates an existing secret with the provided value.
 *
 * @param secretName - The name or ARN of the secret to create or update.
 * @param secretValue - The value to store; it will be serialized to a JSON string.
 *
 * @throws Any error thrown by the AWS Secrets Manager client when creation fails for reasons other than the secret already existing.
 */
export async function upsertSecret(secretName: string, secretValue: Record<string, unknown>):Promise<void> {
    const client = createSecretsManagerClient();
    try {
        await client.send(
            new CreateSecretCommand({
                Name: secretName,
                SecretString: JSON.stringify(secretValue)
            })
        )
    } catch (error) {
        console.log(error)
        if(error instanceof ResourceExistsException) {
            await client.send(
                new PutSecretValueCommand({
                    SecretId: secretName,
                    SecretString: JSON.stringify(secretValue)    
                })
            )
        } else {
            throw error;
        }
    }
}

/**
 * Parses the `SecretString` field of a Secrets Manager response into an object of type `T`.
 *
 * @param secret - The Secrets Manager `GetSecretValueCommandOutput` containing `SecretString`.
 * @returns The parsed `SecretString` as `T` if present and valid JSON, `null` otherwise.
 */
export function parseSecretString<T = Record<string, unknown>>(secret: GetSecretValueCommandOutput): T | null {
    if(!secret.SecretString) return null
    try {
        return JSON.parse(secret.SecretString) as T
    } catch (error) {
        console.log(error)
        return null
    }
}