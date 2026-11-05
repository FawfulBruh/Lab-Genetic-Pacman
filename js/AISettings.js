// Settings for AI training, evaluation, and rewards.
// These are intentionally poor starter values, not optimized settings.
const AI_SETTINGS = Object.freeze({
    network: {
        inputCount: 8,
        hiddenNeuronCount: 4,
        outputCount: 4,
    },
    inputs: {
        noTargetOffset: 0,
        noGhostOffset: 1,
        wallDetected: 1,
        pathClear: 0,
    },
    // -- Hello! This is where I'm going to start annotating
    /* AI trains by getting positive or negative reinforcement from certain actions
     Each action has a score attached to it, more points means it's reinforcing that habit more
     It eventually will reset, and try to mimic what got it points the last time, and avoid
     what didn't get points. But, whenever it resets, a small ammount of randomness is added
     to encourage mutations that benefit the AI by "experimenting" with new behavior

     If the mutation is beneficial, the AI will keep that adaptation as it is reinforced
     through a better score. This can sometimes backfire, as a negative habit can be reinforced
     as long as there are other positive habits are there, it will try to copy EVERYTHING.

     ( For example, an AI gets a new highscore with a strategy of running around the entire outside
     of the pac-man maze, but it continues to try looping around even when there are no pellets left
     because it was reinforced to run around the outside.)

     Each reset (w/ mutations) is called a generation. However a generation doesn't always end
     with ONE failure, sometimes it will try the game 10 times before deciding to move on to the next generation,
     each "attempt" is called an agent (within a population of multiple agents) in this context, where the AI will attempt to mimic the best performing agents
     from it's last generation's population, creating a genetic algorithm of learning!
    */
    /*
     Experiment 1:
     Treatment:
        Population +6
        Mutation rate doubled
     Hypothesis:
        More population and mutation rate per generation will give us
        a larger variety of agents to learn from, resulting in slower
        but more consistent learning.
     Result:
        In the first generations, the pacman kept getting stuck on the upper wall,
        but one agent mutated to turn right which substantially increased it's score.
        Then the next generation all turned right as well! Still very slow learning.

    Experiment 2:
     Treatment:
        Mutation strength doubled
        Dot Rewards * 1.5
        Survival Points per second doubled
     Hypothesis:
     I'm hoping this will encourage the pacman to experiment more drastically and
     reward longer lifetimes of just running around collecting dots. This may encourage
     camping out to survive but we'll see.
     Result:
        More of the same, but it had one extremely good attempt it didn't seem to learn from.
        I'm going to increase the mutation a LOT just to see if it helps it learn faster

      Experiment 3:
      Treatment:
       Mutation Rate -> 0.35 (0.10)
       Mutation Strength -> 0.5 (0.4)
      Hypothesis:
      Lots more mutation rate, with only a little more strength. Hope to diversify the results
      Result:
        They seemed to learn a teensy bit quicker, but i think the issue is actually the
        population size. They have too many "average" results I think that are dampening the really
        salient examples.

        Experiment 4:
      Treatment:
      Decreased population size to 6

      Hypothesis:
      Just testing to see if a decreased population will help us "evolve" quicker.
      That's how bugs got so advanced right? Short lifetime, fast evolution.
      Result:
      Worse. Generation 50 and they were still stuck on that first wall!

      Experiment 5:
      Error

      Treatment:
      As described in #3
      Hypothesis:
      I just realized that # 3 & 4 were flawed. I never changed the mutation rate. How? Idk.
      Restarting CORRECTLY from #3 + less population because this is taking too long
      Result:
      Much better. It learned how to do a little loop de-loop
      Still Unsatisfied by how many times it just sits there and doesn't move.

      Doing the scientific notation is fun, but this is taking a lot more time
      than i had originally thought, so I'm going to list the changes really quickly
      at the end for what worked best

        + Made survival points NEGATIVE to encourage pacman
        to always be moving and collecting pellets

        + Cranked up simulation speed and upped population for more testing faster
        50x speed oh my good lord
        +Increased inheritance with more elites and crossover
        + Made power pellets VERY rewarding to encourage chasing them,
        hopefully catching some ghosts and getting every power pellet on the map.
        Need to decrease population size- again. Too stagnant. Down to 4, elites and min parents down to 2


        Oh god it's actually softlocked, it won't stop running away from ghosts forever
        idk how he's faster but he is wow

        MORE SIMULATION! 100x SPEED!!!
        Ahh music to my ears it's so loud
        Decreased inheritance & elites,to reward unique results better
        More population, but increased mutation...like a lot
        we're going sicko mode mutation rate to 3 and strength to 6

        Pacman keeps getting stuck in a loop
        Decreasing mutation strength to 2

        Ok I'm going to let this sit at 100x speed and come back after awhile
        to see if it's had a breakthrough, its trying a lot of different strategies
        so I think it just needs time

        So I got A pretty high score but pacman won't stop getting stuck
        The easiest fix I can think of is cranking up the difficulty and making
        the ghosts just slighly faster than pacman so they will catch up eventually

        And since survival time points are NEGATIVE it will discourage getting stuck
        Normally it would discourage getting stuck but since it never DIES it never resets
        to learn. I hope it doesn't figure out how to juke around corners or something

        On a side note, increasing the difficulty actually made pacman learn faster
        because he gets punished for failing  and not moving a lot more

        Even when i slow it down it just keeps repeating the exact same thing so I'm cranking up
        mutation to the max

        New HIGH SCOREEEEEE 38,265 points!
        And it only happened on generation 120ish
        so I'm hoping it will learn a new high score route soon

        Oh screenshotting reset the program so I quit
        Final score 38,265 points

     */
    geneticAlgorithm: {
        populationSize: 6,
        mutationRate: 5,
        mutationStrength: 12,
        crossoverRate: 0.5,
        parentPoolFraction: 0.5,
        eliteCount: 1,
        minimumParentCount: 2,
    },
    rewards: {
        dot: 15,
        powerPellet: 50,
        ghost: 200,
        collectedPelletBonus: 100,
        levelCompletedBonus: 10000,
        survivalPointsPerSecond: -5,
    },
    simulation: {
        framesPerSecond: 60,
        speedDefault: 50,
        speedMinimum: 10,
        speedMaximum: 100,
        speedStep: 1,
    },
    actors: {
        pacmanSpeed: 0.12,
        ghostSpeed: 0.12005,
        frightenedGhostSpeedMultiplier: 0.6,
        eatenGhostSpeedMultiplier: 1.8,
        collisionDistance: 0.7,
        frightenedDurationFrames: 360,
    },
    opponents: {
        pinkyTargetOffset: 4,
        inkyTargetOffset: 2,
        clydeScatterDistance: 6,
    },
});
