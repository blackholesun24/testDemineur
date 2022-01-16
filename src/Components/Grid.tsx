import React from 'react';
import { GameContext } from '../GameContext';
import { Cell } from './Cell';
import { Game } from './Game';

export const Grid: React.FunctionComponent = () => {
    const { grid, updateGridCellStatus } = React.useContext(GameContext);

    const handleClick = (index: number, button: number) => {
        updateGridCellStatus(index, button === 0 ? 'dig' : 'flag');
    };

    const gameOver =
        (grid.isDefeated() && 'defeat') ||
        (grid.isVictorious() && 'victory') ||
        false;

    return (
        <React.Fragment>
            <div className="game"
                 style={{
                     display: 'flex',
                     alignItems: 'center',
                     flexDirection: 'column',
                 }}
            >
                <div className="game-header with-border-frame background-opacity-light">
                    <h1>LE DEMINEUR</h1>
                </div>

                <div className="game-grid with-border-frame background-opacity-light"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        border: '1px solid black',
                        boxSizing: 'content-box',
                        flexWrap: 'wrap',
                        margin: 'auto',
                        padding: '2px',
                        background: 'rgba(255,255,255,0.3)',
                        width: `calc(40px * ${grid.column})`,
                    }}
                >

                    {grid.map((cell, index) => (
                        <Cell
                            key={index}
                            status={cell.status}
                            numberOfAdjacentBomb={grid.cellNumberOfAdjacentBomb(index)}
                            onclick={(ev: MouseEvent) =>
                                handleClick(index, ev.button)
                            }
                        />
                    ))}
                </div>

                <Game gameOver={gameOver} />

            </div>
        </React.Fragment>
    );
};
