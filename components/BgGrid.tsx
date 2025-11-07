const ROWS = 12;
const COLS = 20;
const FILLED_CELLS = [ [ 3, 12 ], [ 4, 3 ], [ 5, 2 ] ];

const isFilled = (row: number, column: number) => (
  FILLED_CELLS.some(cell => cell[0] === row && cell[1] === column));

const BgGrid = () => {
  return (
    <table
      className='absolute top-0 left-0 opacity-50'
    >
      { Array.from({ length: ROWS }).map((_, i) => (
        <tr key={ i }>
          { Array.from({ length: COLS }).map((_, j) => {
            const bg = isFilled(i, j) ? 'bg-[#E8E8E8]' : 'bg-transparent'

            return (
              <td
                className={`${bg} border-[0.88px] border-[#E8E8E8] w-[105px] h-[105px] min-w-[105px] min-h-[105px] bg-transparent`}
                key={ j }
              />
            )
          }) }
        </tr>
      )) }
    </table>
  );
};

export default BgGrid;
