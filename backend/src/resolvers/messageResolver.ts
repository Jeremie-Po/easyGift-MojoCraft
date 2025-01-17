import {
    Arg,
    Int,
    Mutation,
    PubSub,
    PubSubEngine,
    Query,
    Resolver,
    Root,
    Subscription,
} from 'type-graphql'
import { User } from '../entities/user'
import { Message } from '../entities/message'
import { Discussion } from '../entities/discussion'

@Resolver(Message)
class MessageResolver {
    @Query(() => [Message])
    async getMessagesByDisscution(
        @Arg('discussionId') discussionId: number,
        @Arg('limit', () => Int, { defaultValue: 10 }) limit: number,
        @Arg('offset', () => Int, { defaultValue: 0 }) offset: number
    ): Promise<Message[]> {
        const messages = await Message.find({
            where: { discussion: { id: discussionId } },
            order: { created_at: 'DESC' },
            relations: ['user', 'user.avatar'],
            take: limit,
            skip: offset,
        })

        messages.reverse()

        return messages
    }
    @Query(() => [Message])
    async getMessagesByDiscussion(
        @Arg('discussionId') discussionId: number,
        @Arg('limit', () => Int, { defaultValue: 10 }) limit: number,
        @Arg('offset', () => Int, { defaultValue: 0 }) offset: number
    ): Promise<Message[]> {
        const messages = await Message.find({
            where: { discussion: { id: discussionId } },
            order: { created_at: 'DESC' },
            relations: ['user', 'user.avatar'],
            take: limit,
            skip: offset,
        })

        messages.reverse()

        return messages
    }

    @Mutation(() => Message)
    async createMessage(
        @Arg('content') content: string,
        @Arg('userId') userId: number,
        @Arg('discussionId') discussionId: number,
        @PubSub() pubsub: PubSubEngine
    ): Promise<Message> {
        const message = new Message()
        message.content = content
        message.user = await User.findOneOrFail({
            where: { id: userId },
            relations: ['avatar'],
        })
        message.discussion = await Discussion.findOneOrFail({
            where: { id: discussionId },
        })

        await message.save()
        await pubsub.publish(`NEW_DISCUSSION_${discussionId}`, message)
        return message
    }

    @Subscription(() => Message, {
        topics: ({ args }) => `NEW_DISCUSSION_${args.discussionId}`,
    })
    newMessage(
        @Arg('discussionId') discussionId: number,
        @Root() newMessage: Message
    ): Message {
        return newMessage
    }
}
export default MessageResolver
