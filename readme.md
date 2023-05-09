WIP

Problem Space

    Keeping track of player/monster locations across multiple people through description only.

Solution

    To simplify the dnd battle situation and help everyone visualize and keep track of where everyone is to avoid confusion and help everyone continue to have fun

    End user will typically be a dungeon master and sometime players themselves.
    this will be able to help DMs articulate a battle situation on the fly without the need for physical tools. The DM will be able to show the players where monsters are moving and player will be able to think about their moves.
    While being simple it will help leave the rest of the game continue to be done via description and imagination.

Description

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

    mobile is NOT meant to have a canvas. mobile will be used to keep track of the added monsters/players to the list, or even to add monsters/players to the list

Tech stacks used

    -react.js
    -react-beautiful-dnd (removed due to complications)
        -looking to implement drag and drop in the sidebar in the future
    -canvas element
    -tailwind (removed due to time constraints)
    -tool top library to remove the words from buttons to instead have logos that could be more fitting

stepped away from using JWTs as it wasnt needed until i implement websockets.

    will add authentication and authorization when websockets are implemented.

Things to add/change

    will need to adjust and have a look at the dungeons and dragon api due to lack of images for some monsters. perhaps will have to add my own..

    would like to have everything saved to a database, mainly, the canvas element and drawings with it. getting this to work will be key to having a smooth experience

    in hindsight, having the search monster would make more sense as a button that pops up a modal to be more similar to Add player feature.

    this way it could show all more information without cramping up the sidebar

    a bonus would be the ability to choose the image that would be used for the token
