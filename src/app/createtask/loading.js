// i like the black background white text loading in center.
// takes all the focus to loading, away from the actual loading.

// universally available to all routes (provided you have them in the route folder) in nextjs environment... 

import React from "react";

const loading = () =>{
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          zIndex: 9999, 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center', 
        }}
      >
        <p
          style={{
            color: 'white',
            fontSize: '18px',
            textAlign: 'center',
            fontWeight: '500',
          }}
        >
          Loading
        </p>
      </div>
    );
  };
  
  export default loading;
  