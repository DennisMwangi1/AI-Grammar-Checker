const testContent =
  "The weather has been really nice lately, we could go outside to the park to enjoy the sun. I was thinking we could walk around for a bit, then maybe we could have a picnic or sit on the benches, just relax and enjoy the view. The flowers are blooming, and it’s so pretty, everyone should enjoy this moment before the summer heat comes in. If we are lucky, we might see some people playing frisbee or having a barbecue. It’s a perfect time for some outdoor activity, although, I am not sure if there’s a lot of people or just a few, since I didn’t check the weather forecast yet. I was hoping that we would have been able to get some good food ready for lunch but I forgot to get the sandwiches from the store. Maybe you could have helped with that, but now I’ll have to buy something from the local shop instead. I feel like we might have missed the best time to go because now it's getting late, and the sun is starting to set. The temperature isn’t too warm, but it's still comfortable enough to be outside. I was thinking maybe we could go back home to have dinner instead, but I am sure we could just bring some food back to eat outside in the garden. I can’t wait for us to have fun today, we really need to spend more time together. It's been a while since we last went outside and got fresh air. There is so much to talk about and catching up to do. The only problem is, I forgot to bring my phone with me, and I need it to text some people who might be meeting us later. If I didn’t forget to bring it, I would have been able to let them know exactly where we are going. But no worries, I guess they’ll figure it out themselves or maybe they won’t even show up at all. Sometimes, I wonder if they really want to hang out or if they just say it out of politeness. I should have asked them more questions the last time we spoke, but I was too busy with work to even think about it. It’s probably better to just leave them alone and not overthink things, but I can't help but feel like there’s something we need to talk about. The day was still good though, despite the little hiccups along the way. I enjoyed the moment we spent together even if we didn’t do everything I planned for, it was still a lovely time outside. Let’s hope that next time we go out, everything will go according to plan, so we don’t have to worry about forgetting things.";

const testData = [
  {
    sentence:
      "If we are lucky, we might even see some people playing\n" +
      "frisbee or having a barbecue.",
    error:
      "The word for this plastic disk used to make sport is normally capitalized because it’s a trademark.",
    suggestions: ["Frisbee"],
    position: { start: 388, end: 395 },
  },
  {
    sentence:
      "I was hoping that we would've been able to get\n" +
      "some good food ready for lunch but I forgot to get the sandwiches from the\n" +
      "store.",
    error:
      "Use a comma before ‘but’ if it connects two independent clauses (unless they are closely connected and short).",
    suggestions: [", but"],
    position: { start: 655, end: 659 },
  },
  {
    sentence:
      "I feel like we might of missed the best time to go\n" +
      "because now it's getting late, and the sun is starting to set.",
    error:
      "It’s never correct to use ‘of’ after a modal verb. Use “might have”, or, in informal register, “might've”.",
    suggestions: ["might have", "might've"],
    position: { start: 823, end: 831 },
  },
  {
    sentence:
      "But no worries,\n" +
      "I guess they'll figure it out themselves or maybe they won't even show up at\n" +
      "all.",
    error:
      "Use a comma before ‘or’ if it connects two independent clauses (unless they are closely connected and short).",
    suggestions: [", or"],
    position: { start: 1615, end: 1618 },
  },
  {
    sentence:
      "I should've ask them more questions the last time we spoke,\n" +
      "but I was too busy with work to even think about it.",
    error: "The inflection of the verb “ask” seems to be incorrect here.",
    suggestions: ["asked", "been asking", "to ask"],
    position: { start: 1763, end: 1766 },
  },
  {
    sentence:
      "Lets\n" +
      "hope that next time we go out, everything will go according to plan, so we don't\n" +
      "have to worry about forgetting things.",
    error:
      "Did you mean “Let's” (let’s = let us; lets = 3rd person singular of ‘let’)?",
    suggestions: ["Let's"],
    position: { start: 2203, end: 2207 },
  },
];

export { testContent, testData };
