import { Cell, CellAction } from './Cell';

export type Cells = Array<Cell>;

export class Grid {
    [key: number]: number;
    private _column: number;
    private _cells: Cells;

    static generate(row: number, column: number, minesCount: number): Grid {
        const length = row * column;
        let cells: Cells = [];
        for (let i = 0; i < length; i++) {
            const cell = minesCount > i ? Cell.withBomb() : Cell.withoutBomb();
            cells.push(cell);
        }

        let index = -1;
        while (++index < length) {
            const rand = index + Math.floor(Math.random() * (length - index));
            const cell = cells[rand];

            cells[rand] = cells[index];
            cells[index] = cell;
        }

        return new Grid(column, cells);
    }

    constructor(column: number, cells: Cells) {
        if (!Number.isInteger(column)) {
            throw new TypeError('column count must be an integer');
        }

        if (cells.length % column !== 0 || cells.length === 0) {
            throw new RangeError(
                'cell count must be dividable by column count'
            );
        }

        this._column = column;
        this._cells = cells;
    }

    [Symbol.iterator]() {
        return this._cells[Symbol.iterator]();
    }

    map(
        callbackfn: (value: Cell, index: number, array: Cell[]) => {},
        thisArg?: any
    ) {
        return this._cells.map(callbackfn);
    }

    cellByIndex(index: number): Cell | undefined {
        return this._cells[index];
    }

    cellByCoodinates(x: number, y: number): Cell | undefined {
        return this._cells[this._column * y + x];
    }

    cellNumberOfAdjacentBomb(index: number): number{
        const adjacentCellMatrix: number[] = [-this.column-1, -this.column, -this.column+1, -1, +1, this.column-1, this.column, this.column+1];
        let numberOfAdjacentBomb: number = 0;
        adjacentCellMatrix.forEach((differenceWithClickedCase) => {
            const cellShouldBeTested = this.cellByIndex(index + differenceWithClickedCase);
            if(cellShouldBeTested !== undefined && cellShouldBeTested.bomb ){
                numberOfAdjacentBomb++;
            }
        });
        return numberOfAdjacentBomb;
    }

    sendActionToCell(cellIndex: number, action: CellAction): Grid {
        const cells = [...this._cells];
        const cell = cells[cellIndex];

        cells[cellIndex] = cell[action]();
        return new Grid(this._column, cells);
    }

    isDefeated = () => {
        for (let cell of this) {
            if (cell.detonated === true) return true;
        }
        return false;
    };

    isVictorious = () => {
        let numberOfClickedCell: number = 0;
        let numberOfMines: number = 0;
        for (let cell of this) {
            if(cell.bomb === true){
                numberOfMines++
            }
            if(cell.detonated === true){
                return false;
            }

            if(cell.dug === true){
                numberOfClickedCell++;
            }
        }

        if(numberOfClickedCell === this._cells.length - numberOfMines){
            return true;
        }

        return false
    };

    get column() {
        return this._column;
    }

    get cells() {
        return this._cells;
    }
}
