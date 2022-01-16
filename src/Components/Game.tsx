import React from 'react';
import {CellStatus} from "../Domain/Cell";

type GameProps = {
    gameOver: false | 'victory' | 'defeat';
};

export const Game: React.FunctionComponent<GameProps> = props => {
    return (
        <div className="game-board with-border-frame background-opacity-light">
            <div className="game-board-element"> Status : {props.gameOver}</div>
            <div className="game-board-element">Score: 100</div>
            <div className="game-board-element">Temps: 2 sec</div>
        </div>
    )

};
