import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player: any, resetPlayer: () => void) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);
    const [scoreDelta, setScoreDelta] = useState(0);

    useEffect(() => {
        setRowsCleared(0);
        setScoreDelta(0);

        const sweepRows = (newStage: any[]) => {
            let currentScoreDelta = 0;
            const sweptStage = newStage.reduce((ack, row) => {
                // Check if row is full: findIndex where cell.value === 0
                if (row.findIndex((cell: any) => cell.value === 0) === -1) {
                    // Calculate score: Sum of numbers (cell.num)
                    const rowScore = row.reduce((sum: number, cell: any) => sum + (cell.num || 0), 0);
                    currentScoreDelta += rowScore;

                    setRowsCleared((prev) => prev + 1);
                    // Add new empty row at top
                    // createStage uses Array.from maps.. we need strict object structure here
                    ack.unshift(new Array(newStage[0].length).fill({ value: 0, status: 'clear', num: 0 }));
                    return ack;
                }
                ack.push(row);
                return ack;
            }, []);

            if (currentScoreDelta > 0) {
                setScoreDelta(currentScoreDelta);
            }
            return sweptStage;
        };

        const updateStage = (prevStage: any[]) => {
            // First flush the stage from the previous render.
            const newStage = prevStage.map((row) =>
                row.map((cell: any) => (cell.status === 'clear' ? { value: 0, status: 'clear', num: 0 } : cell))
            );

            // Then draw the simplified tetromino
            player.tetromino.forEach((row: any[], y: number) => {
                row.forEach((cell: any, x: number) => {
                    if (cell.value !== 0) {
                        const targetY = y + player.pos.y;
                        const targetX = x + player.pos.x;
                        if (
                            newStage[targetY] &&
                            newStage[targetY][targetX]
                        ) {
                            newStage[targetY][targetX] = {
                                value: cell.value,
                                status: `${player.collided ? 'merged' : 'clear'}`,
                                num: cell.num
                            };
                        }
                    }
                });
            });

            // Then check if it collided
            if (player.collided) {
                resetPlayer();
                return sweepRows(newStage);
            }

            return newStage;
        };

        setStage((prev) => updateStage(prev));
    }, [player, resetPlayer]);

    return [stage, setStage, rowsCleared, scoreDelta] as const;
};
