// ImageBlock component. Renders the image puzzle and handles the events.

import React from "react";

const blockSize: number = 100;

interface TileProps {
    tileIndex: number,       // Number (0-24) that identifies tile index; this will be randomized
    x: number,               // Coordinates on the page
    y: number,
    clicker: () => void      // onClick event
};
type Coords = {
    x: number,
    y: number
};

// Which tile is currently chosen as the first choice for switching? -1 means no selection.
let choice: number = -1;
let victory: boolean = false;

function ImageBlock() {

    const clicked = (tile: number) => {
        let img2 = document.getElementById("tile"+tile);
        if (!img2 || victory) return;

        if (choice === -1) {     // Nothing chosen. Make this the first selection then!
            choice = tile;
            img2.style.opacity = "0.4";
            return;
        }
        // This is the second choice, so make the switch!
        let img1 = document.getElementById("tile"+choice);
        if (!img1) return;
        img1.style.opacity = "1.0";

        // Switch the location of both tiles, ES6 style!
        [img1.style.left, img1.style.top, img2.style.left, img2.style.top] =
            [img2.style.left, img2.style.top, img1.style.left, img1.style.top];

        choice = -1;

        if (isItDone()) {
            victory = true;
            let el = document.getElementById("msg");
            if (el) el.innerHTML = "CONGRATULATIONS!!";
        }
    };

    victory = false;

    // Define a shuffled array for tiles
    var tileList: number[] = [];
    for (let i=0; i<25; i++)
        tileList.push(i);
    shuffleArray(tileList);

    // Fill in the JSX content
    var content: any[] = [];
    for (let i=0; i<25; i++) {
        content.push(<ImageTile key={"tile"+i} x={getTilePosition(i).x} y={getTilePosition(i).y}
            tileIndex={tileList[i]} clicker = { () => {clicked(tileList[i])} } />);
    }
    return(<>
        {content}
    </>);
}

// Tile (React) component
function ImageTile(props: TileProps) {
    return(<>
        <img id={"tile"+props.tileIndex} src={require('../tiles/' + props.tileIndex + '.png')} 
            style={{ position: 'absolute', width: blockSize, height: blockSize,
            left: props.x + 'px', top: props.y + 'px', transition: 'left 300ms, top 300ms' }}
            alt='puzzle' onClick={props.clicker}></img>
    </>);
}

function getTilePosition(tNumber: number) : Coords {
    return {
        x: Math.floor(tNumber % 5) * (blockSize + 3),
        y: Math.floor(tNumber / 5) * (blockSize + 3)
    };
}

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function isItDone() : boolean {
    // Scan through all tiles and check their position
    for (let i=0; i<25; i++) {
        let tile = document.getElementById("tile" + i);
        if (!tile) return false;

        const expectedPos: Coords = getTilePosition(i);
        // The "slice" operation is to remove the final 'px' from the CSS style values
        if (Number(tile.style.left.slice(0, -2)) !== expectedPos.x || Number(tile.style.top.slice(0, -2)) !== expectedPos.y)
            return false;   // Found at least one misplaced tile
    }
    return true;    // All in the right place!
}

export default ImageBlock;
