#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MainStack } from '../lib/MainStack';
import { ChildStack } from '../lib/ChildStack';
import { Tag } from '@aws-cdk/core';

const app = new cdk.App();
const mainStack = new MainStack(app, 'MainStack');

Tag.add(mainStack, 'app', 'main');

app.synth();
