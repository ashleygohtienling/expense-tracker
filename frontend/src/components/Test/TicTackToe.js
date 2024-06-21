const rowStyle = {
  display: "flex",
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const [winner, setWinner] = useState(null);
  const [player, setPlayer] = useState("X");
  const winningCombinations = [
    ["1", "2", "3"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["1", "5", "9"],
    ["3", "5", "9"],
    ["1", "3", "6"],
    ["2", "5", "8"],
    ["3", "6", "9"],
  ];
  const [scoreBoard, setScoreBoard] = useState(() => {
    const initialScoreBoard = new Map();
    for (let i = 1; i <= 9; i++) {
      initialScoreBoard.set(`${i}`, null);
    }
    return initialScoreBoard;
  });

  const handler = (value) => {
    if (!scoreBoard.get(value)) {
      scoreBoard.set(value, player);
      setPlayer(player === "O" ? "X" : "O");
      setScoreBoard(new Map(scoreBoard));
      checkWinner();
    }
  };

  const clearScoreBoard = () => {
    for (let key of scoreBoard.keys()) {
      scoreBoard.set(key, null);
    }
    setScoreBoard(new Map(scoreBoard));
    setPlayer("X");
    setWinner(null);
  };

  const checkWinner = () => {
    for (let combo of winningCombinations) {
      let [a, b, c] = combo;
      if (
        scoreBoard.get(a) === scoreBoard.get(b) &&
        scoreBoard.get(b) === scoreBoard.get(c)
      ) {
        setWinner(scoreBoard.get(a));
      }
    }
  };

  return (
    <GameContext.Provider
      value={{
        winner,
        player,
        scoreBoard,
        clearScoreBoard,
        handler,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

function Square({ value }) {
  const { scoreBoard, handler } = useContext(GameContext);
  return (
    <div className="square" style={squareStyle} onClick={() => handler(value)}>
      {scoreBoard.get(value)}
    </div>
  );
}

function Board() {
  const { winner, player, clearScoreBoard } = useContext(GameContext);

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next Player: <span>{player}</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>{winner ?? "None"}</span>
      </div>
      <button style={buttonStyle} onClick={clearScoreBoard}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square value="1" />
          <Square value="2" />
          <Square value="3" />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value="4" />
          <Square value="5" />
          <Square value="6" />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value="7" />
          <Square value="8" />
          <Square value="9" />
        </div>
      </div>
    </div>
  );
}

export default function TickTackToe() {
  return (
    <div className="game">
      <div className="game-board">
        <GameContextProvider>
          <Board />
        </GameContextProvider>
      </div>
    </div>
  );
}
