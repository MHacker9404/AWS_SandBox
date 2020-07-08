import { NestedStack, NestedStackProps, Construct, Tag } from '@aws-cdk/core';
import { StringParameter, ParameterType } from '@aws-cdk/aws-ssm';

export class ChildStack extends NestedStack {
    constructor(scope: Construct, id: string, props?: NestedStackProps) {
        super(scope, id, props);

        Tag.add(this, 'main', 'child');

        new StringParameter(this, 'string-parameter', {
            parameterName: `/${id}/string-parameter`,
            stringValue: 'string-parameter',
            type: ParameterType.STRING,
        });
    }
}
