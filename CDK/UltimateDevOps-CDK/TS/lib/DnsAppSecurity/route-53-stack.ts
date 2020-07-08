import { Aws, Stack, Construct, StackProps } from '@aws-cdk/core';
import { StringParameter, ParameterType } from '@aws-cdk/aws-ssm';
import { HostedZone, ARecord, RecordTarget } from '@aws-cdk/aws-route53';

export class Route53Stack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here
        const project_name = this.node.tryGetContext('project_name');
        const environment = this.node.tryGetContext('environment');

        const account_id = Aws.ACCOUNT_ID;
        const region = Aws.REGION;

        const hostedZone: HostedZone = new HostedZone(this, 'hosted-zone', {
            zoneName: 'prb-services-llc.com',
        });

        //  below is to import zone already hosted in Route53
        // const hostedZone_1:HostedZone = HostedZone.fromLookup(this, 'hosted-zone-id', {
        //     domainName: 'prb-services-llc.com'
        // });

        const aRecord: ARecord = new ARecord(this, `${environment}-record`, {
            zone: hostedZone,
            target: RecordTarget.fromIpAddresses('1.1.1.1'),
            recordName: `${environment}`,
        });

        // new StringParameter(this, 'webacl-ref-param', {
        //     parameterName: `/${environment}/webacl-ref`,
        //     // stringValue: webACL.ref,
        //     type: ParameterType.STRING,
        // });
    }
}
