## Basic usage:
### First time users

1. Clone this repo.
2. Run `node ./till.js`
3. Modify the created `./valley/meadows.js` with the paths of config files to save.
4. Run `node ./gather.js`
5. Store the contents of `./valley` any way you like (recommendation is git).

### Returning users

1. Clone this repo.
2. Copy your existing `./valley` into this repo.
3. Run `node ./sow.js`.
## Known bugs:
- Gather deletes a directory synchronously when an async workflow would be ideal
- No way to specify files to ignore
