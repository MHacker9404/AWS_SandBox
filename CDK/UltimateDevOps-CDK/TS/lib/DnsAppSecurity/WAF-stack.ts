import { Aws, Stack, Construct, StackProps } from '@aws-cdk/core';
import { CfnWebACL } from '@aws-cdk/aws-wafv2';
import { StringParameter, ParameterType } from '@aws-cdk/aws-ssm';

export class WafStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here
        const project_name = this.node.tryGetContext('project_name');
        const environment = this.node.tryGetContext('environment');

        const account_id = Aws.ACCOUNT_ID;
        const region = Aws.REGION;

        const basicRule: CfnWebACL.RuleProperty = {
            name: 'AWSManagedCommonRule',
            priority: 0,
            statement: {
                managedRuleGroupStatement: {
                    name: 'AWSManagedRulesCommonRuleSet',
                    vendorName: 'AWS',
                },
            },
            overrideAction: {
                count: {},
            },
            visibilityConfig: {
                cloudWatchMetricsEnabled: true,
                metricName: 'AWSManagedCommonRule',
                sampledRequestsEnabled: true,
            },
        };

        const webACL: CfnWebACL = new CfnWebACL(this, 'web-acl-id', {
            defaultAction: {
                allow: {},
            },
            scope: 'CLOUDFRONT',
            visibilityConfig: {
                cloudWatchMetricsEnabled: true,
                metricName: `${project_name}-${environment}`,
                sampledRequestsEnabled: true,
            },
            name: `${project_name}-${environment}-webACL`,
            rules: [basicRule],
        });

        new StringParameter(this, 'webacl-id-param', {
            parameterName: `/${environment}/webacl-id`,
            stringValue: webACL.attrId,
            type: ParameterType.STRING,
        });
        new StringParameter(this, 'webacl-arn-param', {
            parameterName: `/${environment}/webacl-arn`,
            stringValue: webACL.attrArn,
            type: ParameterType.STRING,
        });
        new StringParameter(this, 'webacl-ref-param', {
            parameterName: `/${environment}/webacl-ref`,
            stringValue: webACL.ref,
            type: ParameterType.STRING,
        });
    }
}
