#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { VpcStack } from '../lib/vpc-stack';
import { SecurityStack } from '../lib/security-stack';

const app = new cdk.App();
let vpc_stack = new VpcStack(app, 'VpcStack');
let sec_stack = new SecurityStack(app, 'SecurityStack', { vpc: vpc_stack.vpc });

app.synth();
