const Pagination = ({ page, updatePage }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "25px" }}>
      <button onClick={() => updatePage(1)}>First</button>
      <button
        onClick={() => {
          if (page > 1) updatePage(page - 1);
        }}
      >
        Prev
      </button>
      <button
        onClick={() => {
          if (page < 9) updatePage(page + 1);
        }}
      >
        Next
      </button>
      <button onClick={() => updatePage(9)}>Last</button>
    </div>
  );
};

export default Pagination;
