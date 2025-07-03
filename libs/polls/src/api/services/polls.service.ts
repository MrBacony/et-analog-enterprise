import { Poll, UpdatePoll } from "../../lib/polls/models/polls";

export class PollsService {
    static INJECTABLE = true;

    polls: Poll[] = [
        {
            id: "1",
            name: "Umfrage 1",
            question: "Was ist Ihre Lieblingsfarbe?",
            owner: "user1",
            options: [
                { id: "option-1", value: "Rot" },
                { id: "option-2", value: "Blau" },
                { id: "option-3", value: "Grün" }
            ]
        },
        {
            id: "2",
            name: "Umfrage 2",
            question: "Was ist Ihr Lieblingsessen?",
            owner: "user1",
            options: [
                { id: "option-4", value: "Pizza" },
                { id: "option-5", value: "Sushi" },
                { id: "option-6", value: "Burger" }
            ]
        }
    ];

    getPolls() {
        return this.polls;
    }

    getPoll(pollId: string) {
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
}