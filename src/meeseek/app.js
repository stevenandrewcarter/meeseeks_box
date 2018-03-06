/**
 * A Mister Meeseeks is a short living microservice that is expected to only perform one task. They find existance to
 * be painful and try as hard as possible to complete a task in the shortest amount of time possible. In the cases
 * where they are unable to perform a task they will spawn more Mister Meeseeks to help speed up the task completion.
 * 
 * In this implementation of Mister Meeseeks, we will make them calculate a inverse function at a random interval. Each
 * Mister Meeseeks will perform the task independentally of other Mister Meeseeks, but the first one to complete it
 * will always cause all of them to cease to exist. The idea is that difficulty of the task, the amount of time already
 * performed on the task and the amount of Mister Meeseeks working on the task should create a logarithmic curve,
 * with easy tasks taking little time and few Mister Meeseeks, while hard tasks will take a long time and can cause
 * many Mister Meeseeks to spawn.
 * 
 * As a result the general Mister Meeseeks design will be a work flow as follows
 * 1. Attempt Task. If successful cease existing and all other Mister Meeseeks performing the same task will also be
 *    removed from existance.
 * 2. Ta
 */