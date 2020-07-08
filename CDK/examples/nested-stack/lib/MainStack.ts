import * as cdk from '@aws-cdk/core';
import { ChildStack } from './ChildStack';
import { Tag } from '@aws-cdk/core';

export class MainStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const childStack = new ChildStack(this, 'child-stack', {});
        Tag.add(childStack, 'main', 'child');
        const childStack2 = new ChildStack(this, 'child-stack-2', {});
        Tag.add(childStack2, 'main', 'child-2');
    }
}
