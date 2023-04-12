Problem Space
    Keeping track of player/monster locations across multiple people through description only.

Solution
    To simplify the dnd battle situation and help everyone visualize and keep track of where everyone is to avoid confusion and help everyone continue to have fun

    End user will typically be a dungeon master and sometime players themselves. 
    this will be able to help DMs articulate a battle situation on the fly without the need for physical tools. The DM will be able to show the players where monsters are moving and player will be able to think about their moves. 
    While being simple it will help leave the rest of the game continue to be done via description and imagination. 

Tech stacks used
    react.js
    react-beautiful-dnd (removed due to complications)
    canvas element
    tailwind (removed due to time constraints)

Upon start up user will load a 'login' page.
    while not actually a login page it is a placeholder until I can implement websockets that will
    allow the 'host' to create a room that will allow other users to come and 'watch' the room

    after 'login' the user is brought to the homepage, the homepage is the main page that will display both a 
    'sidebar' and the main 'canvas' 

    users can interact with the canvas by moving 'tokens' and are also able to draw simple lines to represent 
    the environment

    in the sidebar users can use the search function to generate a card that will hold information about a 
    monster
    user can also add a character card

    these cards can be used to spawn tokens inside the canvas

stepped away from using JWTs as it wasnt needed until i implement websockets.
