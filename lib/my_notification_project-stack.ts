import * as cdk from 'aws-cdk-lib/core';
import * as sns from 'aws-cdk-lib/aws-sns'; ``
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';

// Replace with your actual email address before deploying
const SUBSCRIBER_EMAIL = 'YOUR_EMAIL@gmail.com';

export class MyNotificationProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the SNS topic
    const notificationTopic = new sns.Topic(this, 'NotificationTopic', {
      topicName: 'MyNotificationTopic',
      displayName: 'My Notification Topic',
    });

    // Subscribe the email address to the topic.
    // AWS will send a confirmation email — you must click the link before
    // messages are delivered to your inbox.
    notificationTopic.addSubscription(
      new subscriptions.EmailSubscription(SUBSCRIBER_EMAIL)
    );

    // Output the topic ARN so it's easy to reference after deployment
    new cdk.CfnOutput(this, 'TopicArn', {
      value: notificationTopic.topicArn,
      description: 'ARN of the SNS notification topic',
      exportName: 'MyNotificationTopicArn',
    });
  }
}
