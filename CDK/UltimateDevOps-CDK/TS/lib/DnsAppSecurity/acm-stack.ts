import { Aws, Stack, Construct, StackProps } from '@aws-cdk/core';
import { StringParameter, ParameterType } from '@aws-cdk/aws-ssm';
import { HostedZone } from '@aws-cdk/aws-route53';
import { DnsValidatedCertificate } from '@aws-cdk/aws-certificatemanager';

export class AcmStack extends Stack {
    public certMgr: DnsValidatedCertificate;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here
        const project_name = this.node.tryGetContext('project_name');
        const environment = this.node.tryGetContext('environment');

        const account_id = Aws.ACCOUNT_ID;
        const region = Aws.REGION;

        const zoneId = StringParameter.fromStringParameterName(this, 'hosted-zone-id', `/${environment}/hosted-zone-id`);
        const dnsZone = HostedZone.fromHostedZoneAttributes(this, 'hosted-zone', {
            hostedZoneId: zoneId.stringValue,
            zoneName: 'prb-services-llc.com',
        });

        this.certMgr = new DnsValidatedCertificate(this, 'acm-id', {
            hostedZone: dnsZone,
            domainName: 'prb-services-llc.com',
            subjectAlternativeNames: ['*.prb-services-llc.com'],
        });

        // new StringParameter(this, 'hosted-zone-id', {
        //     parameterName: `/${environment}/hosted-zone-id`,
        //     stringValue: hostedZone.hostedZoneId,
        //     type: ParameterType.STRING,
        // });
        // new StringParameter(this, 'hosted-zone-arn', {
        //     parameterName: `/${environment}/hosted-zone-arn`,
        //     stringValue: hostedZone.hostedZoneArn,
        //     type: ParameterType.STRING,
        // });
    }
}
