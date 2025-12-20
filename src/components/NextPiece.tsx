import React from 'react';
import Cell from './Cell';

interface Props {
    tetromino: any;
}

const NextPiece: React.FC<Props> = ({ tetromino }) => {
    return (
        <div className="next-piece-container">
            <h2>Next</h2>
            <div className="next-piece-grid" style={{
                gridTemplateColumns: `repeat(${tetromino.shape[0].length}, 1fr)`,
                width: `${tetromino.shape[0].length * 40}px`, // Adjust width to fit cells (40px)
                height: `${tetromino.shape.length * 40}px`
            }}>
                {tetromino.shape.map((row: any[], y: number) =>
                    row.map((cell: any, x: number) => {
                        return <Cell key={`${y}-${x}`} type={cell.value} num={cell.num} />
                    })
                )}
            </div>
        </div>
    );
};

export default NextPiece;
