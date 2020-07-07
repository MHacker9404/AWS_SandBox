import * as cdk from '@aws-cdk/core';
import { Aws, RemovalPolicy } from '@aws-cdk/core';
import { Bucket, BucketAccessControl, BucketEncryption } from '@aws-cdk/aws-s3';
import { ParameterType, StringParameter } from '@aws-cdk/aws-ssm';

export class S3Stack extends cdk.Stack {
    private bucket: Bucket;

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here
        const project_name = this.node.tryGetContext('project_name');
        const environment = this.node.tryGetContext('environment');

        const account_id = Aws.ACCOUNT_ID;

        this.bucket = new Bucket(this, 'bucket-lambda', {
            accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
            encryption: BucketEncryption.S3_MANAGED,
            //  adding the account id helps prevent conflicts on bucket names
            //  since they have to be globally unique
            bucketName: `${account_id}-${environment}-lambda-deploy-packages`,
            blockPublicAccess: {
                blockPublicAcls: true,
                blockPublicPolicy: true,
                ignorePublicAcls: true,
                restrictPublicBuckets: true,
            },
            removalPolicy: RemovalPolicy.RETAIN,
        });

        new StringParameter(this, 'ssm-lambda-bucket', {
            parameterName: `/${environment}/lambda-s3-bucket`,
            stringValue: this.bucket.bucketName,
            type: ParameterType.STRING,
        });
    }
}
