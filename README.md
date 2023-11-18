# Mars Robot Simulator

## Description

- The application is a simulation of a toy robot moving on a square tabletop, with dimensions 5 units x 5 units.
- No obstructions exist on the table surface.
- The robot can move freely but must be prevented from falling off the table.
- Commands:
  - `PLACE X,Y,F`: Place the toy robot on the table at position X,Y facing NORTH, SOUTH, EAST, or WEST.
  - `MOVE`: Move the toy robot one unit forward in its current direction.
  - `LEFT`: Rotate the robot 90 degrees to the left without changing its position.
  - `RIGHT`: Rotate the robot 90 degrees to the right without changing its position.
  - `REPORT`: Announce the X, Y, and F of the robot.

## Placement Rules

- The origin (0,0) is the SOUTH WEST most corner.
- The first valid command must be a `PLACE` command.
- After the initial placement, any sequence of commands is allowed, including another `PLACE` command.
- The application discards all commands in the sequence until a valid `PLACE` command is executed.

## Movement Constraints

- A robot not on the table ignores `MOVE`, `LEFT`, `RIGHT`, and `REPORT` commands.
- Any move that would cause the robot to fall off the table must be ignored.

## Input

- Input can be from a file or standard input.

## Constraints

- The toy robot must not fall off the table during movement, including the initial placement.

## Implementation

- The application can be implemented in the frontend, backend, or as a multi-tiered app.
- Technologies used: Django/Angular.
- Consider UI/UX design.
- Follow coding/framework best practices.
- Ensure code readability, genericity, sustainability, and evolution.
- Challenge the rules within reason.

## Final Tips and Rules to Remember

- Challenge the rules but not excessively.

## What is still left to do:

- Fix turn orientation issue
- Add inputs forms
- Handle errors more smoothly for the user
- Add unit tests
- Add e2e tests
- Add more styling
