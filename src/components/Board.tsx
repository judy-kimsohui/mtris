import React from 'react';
import Cell from './Cell';

// Board 컴포넌트가 받을 props 타입
interface Props {
    // 게임 보드 상태 (2차원 배열)
    stage: any[][];
}

// 게임 전체 보드를 렌더링하는 컴포넌트
const Board: React.FC<Props> = ({ stage }) => {

    // 보드 스타일 정의 (CSS Grid 사용)
    const style: React.CSSProperties = {
        // Grid 레이아웃 사용
        display: 'grid',

        gridTemplateColumns: `repeat(${stage[0].length}, 1fr)`,
        gridAutoColumns: '1fr',
        gap: '1px',

        // 셀 사이 간격
        gridGap: '1px',

        // 보드 테두리
        border: '2px solid #333',

        // 부모 기준 가로 100%
        width: '100%',

        // 배경색
        background: '#111',

        // 보드 그림자 효과
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
    };

    return (
        <div className="game-board" style={style}>
            {/* stage의 각 행(row)을 순회 */}
            {stage.map((row) =>
                // 각 행의 셀(cell)을 Cell 컴포넌트로 렌더링
                row.map((cell: any, x: number) => (
                    <Cell
                        key={x}
                        type={cell.value} // 블록 타입 (was cell[0])
                        num={cell.num}    // 표시할 숫자 (was cell[2])
                        status={cell.status} // 상태 전달 (clear | merged)
                    />
                ))
            )}
        </div>
    );
};

export default Board;
