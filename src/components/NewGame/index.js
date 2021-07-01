import React, {useEffect} from 'react';

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


function NewGame() {

  useEffect(() => {
    const roomId = makeid(4)
    const url = `/rooms/${roomId}`
    window.location.href = url; 
  }, []);

  return (
    <div>
      <h1>New Game</h1>
    </div>
  );
};

export default NewGame;


