#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { VpcStackStack } from '../lib/vpc-stack-stack';

const app = new cdk.App();
new VpcStackStack(app, 'VpcStackStack');
