# This is a POC how to create and deploy stacks using the Cloud Development Kit (CDK)

# Reference Architecture

based on the Udemy course: https://www.udemy.com/course/aws-devops-professional-cdk-serverless/

<img src='reference architecture.png' alt='Reference Architecture' />

[//]: # 'install python/nodejs'
[//]: # 'install typescript'
[//]: # 'install cdk cli'
[//]: # 'install serverless cli'

# There are two implementations: python and typescript

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

-   `cdk deploy` deploy this stack to your default AWS account/region
-   `cdk destroy` removes this stack from your default AWS account/region
-   `cdk diff` compare deployed stack with current state
-   `cdk synth` emits the synthesized CloudFormation template (there are issues)
