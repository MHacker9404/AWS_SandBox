#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { VpcStack } from '../lib/vpc-stack';
import { SecurityStack } from '../lib/security-stack';
// import { MasterStack } from '../lib/master-stack';
import { BastionStack } from '../lib/bastion-stack';

const app = new cdk.App();
let vpc_stack = new VpcStack(app, 'VpcStack');
let sec_stack = new SecurityStack(app, 'SecurityStack', { vpc: vpc_stack.vpc });
let bastion_stack = new BastionStack(app, 'BastionStack', { vpc: vpc_stack.vpc, securityGroup: sec_stack.bastion_sg });

/*
let master_stack = new MasterStack(app, 'MasterStack');
let vpc_stack = new VpcStack(master_stack, 'VpcStack');
let sec_stack = new SecurityStack(master_stack, 'SecurityStack', { vpc: vpc_stack.vpc });
*/

app.synth();
