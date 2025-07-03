import { Poll, SubmitVote, UpdatePoll, Vote } from "../../lib/polls/models/polls";

export class PollsService {
    static INJECTABLE = true;

    //id is uuid
    polls: Poll[] = [
        {
            id: "550e8400-e29b-41d4-a716-446655440001",
            name: "Umfrage 1",
            question: "Was ist Ihre Lieblingsfarbe?",
            owner: "user1",
            options: [
                { id: "550e8400-e29b-41d4-a716-446655440011", value: "Rot" },
                { id: "550e8400-e29b-41d4-a716-446655440012", value: "Blau" },
                { id: "550e8400-e29b-41d4-a716-446655440013", value: "Grün" }
            ]
        },
        {
            id: "550e8400-e29b-41d4-a716-446655440002",
            name: "Umfrage 2",
            question: "Was ist Ihr Lieblingsessen?",
            owner: "user1",
            options: [
                { id: "550e8400-e29b-41d4-a716-446655440021", value: "Pizza" },
                { id: "550e8400-e29b-41d4-a716-446655440022", value: "Sushi" },
                { id: "550e8400-e29b-41d4-a716-446655440023", value: "Burger" }
            ]
        }
    ];

    votes: Vote[] = [];

    getPolls() {
        return this.polls;
    }

    getPoll(pollId: string) {
        console.log(`Fetching poll with ID: ${pollId}`, this.polls.find((poll) => poll.id === pollId));
        return this.polls.find((poll) => poll.id === pollId);
    }

    addPoll(poll: Poll) {
        this.polls.push(poll);
        return poll;
    }

    updatePoll(pollId: string, updatedPoll: UpdatePoll) {
        const pollIndex = this.polls.findIndex((poll) => poll.id === pollId);
        if (pollIndex === -1) {
            throw new Error(`Poll with ID ${pollId} not found`);
        }
        this.polls[pollIndex] = { ...this.polls[pollIndex], ...updatedPoll } as Poll;
        return this.polls[pollIndex];
    }

    vote(vote: Vote) {
        this.votes.push(vote);
        return vote;
    }
}