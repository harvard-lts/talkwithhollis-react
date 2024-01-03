<div className="column">
<div className="content">
  {history.map((el, i) => {
    return (
      <History
        key={i}
        question={el["user"]}
        onClick={() =>
          setMessages([
            { role: "user", content: history[i]["user"] },
            { role: "assistant", content: history[i]["assistant"] }
          ])
        }
      />
    );
  })}
</div>
<Clear onClick={clear} />
</div>

The footer is appearing outside the .app div because the .app div is not being set to a height that encompasses the entire page content.

A few things to try:

Set the .app div to height: 100vh instead of just height: 100%. This will make it take up the full viewport height.

Set the body and html elements to height: 100vh as well, to establish the full height context for percentages.

Remove the fixed heights on elements like header and footer. Let the flexbox do the height calculations automatically based on the content.

Consider using flexbox on the .app div as well to distribute the height properly between header/main/footer sections.

The key is making sure the parent container (.app) is sized to the full page height so that child elements inside it are also contained within that full height space. Percentage heights only work if the parent has an explicit height defined.