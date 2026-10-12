import React, { useState } from "react";
const initialTasks = [
  {
    id: 1,
    title: "Study JavaScript",
    completed: false,
    priority: "high"
  },
  {
    id: 2,
    title: "Build project",
    completed: true,
    priority: "medium"
  },
  {
    id: 3,
    title: "Review Git commits",
    completed: false,
    priority: "medium"
  },
  {
    id: 4,
    title: "Prepare presentation",
    completed: true,
    priority: "low"
  },
  {
    id: 5,
    title: "Test the app",
    completed: false,
    priority: "high"
  }
];

const priorityLabels = {
  high: "גבוהה",
  medium: "בינונית",
  low: "נמוכה"
};

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [view, setView] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchedTitle, setSearchedTitle] = useState("");
  const [showCompletedCount, setShowCompletedCount] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState("medium");
  const [nextId, setNextId] = useState(6);
  const [feedback, setFeedback] = useState("");

  // ================================================================
  // STUDENT AREA START
  // השלימו רק את גוף הפונקציות באזור זה.
  // כל פונקציה מקבלת את הנתונים הדרושים לה ומחזירה תוצאה.
  // ================================================================

  function getAllTasks(tasks) {
    // TODO
  }

  function getIncompleteTasks(tasks) {
    // TODO
  }

  function findTaskByTitle(tasks, title) {
    // TODO
  }

  function countCompletedTasks(tasks) {
    // TODO
  }

  function addTask(tasks, newTask) {
    // TODO
  }

  function removeTask(tasks, id) {
    // TODO
  }

  function toggleTaskCompleted(tasks, id) {
    // TODO
  }

  function updateTaskPriority(tasks, id, newPriority) {
    // TODO
  }

  // ================================================================
  // STUDENT AREA END
  // אין צורך לשנות את הקוד שמתחת לקו זה.
  // ================================================================

  function getReadResult() {
    if (view === "incomplete") {
      return getIncompleteTasks(tasks);
    }

    if (view === "search") {
      const foundTask = findTaskByTitle(tasks, searchedTitle);
      return foundTask === undefined ? [] : [foundTask];
    }

    return getAllTasks(tasks);
  }

  const readResult = getReadResult();
  const displayedTasks = Array.isArray(readResult) ? readResult : [];
  const hasValidReadResult = Array.isArray(readResult);

  let completedCount;
  if (showCompletedCount) {
    completedCount = countCompletedTasks(tasks);
  }

  function showAllTasks() {
    setView("all");
    setFeedback("");
  }

  function showIncompleteTasks() {
    setView("incomplete");
    setFeedback("");
  }

  function handleSearch(event) {
    event.preventDefault();
    const cleanTitle = searchInput.trim();

    if (!cleanTitle) {
      setFeedback("יש להזין כותרת מלאה של משימה.");
      return;
    }

    setSearchedTitle(cleanTitle);
    setView("search");
    setFeedback("");
  }

  function applyTasksResult(result, successMessage) {
    if (!Array.isArray(result)) {
      setFeedback("הפונקציה עדיין אינה מחזירה מערך תקין.");
      return false;
    }

    setTasks(result);
    setFeedback(successMessage);
    return true;
  }

  function handleAddTask(event) {
    event.preventDefault();
    const cleanTitle = newTitle.trim();

    if (!cleanTitle) {
      setFeedback("יש להזין כותרת למשימה החדשה.");
      return;
    }

    const newTask = {
      id: nextId,
      title: cleanTitle,
      completed: false,
      priority: newPriority
    };

    const wasAdded = applyTasksResult(
      addTask(tasks, newTask),
      "המשימה נוספה בהצלחה."
    );

    if (wasAdded) {
      setNextId((currentId) => currentId + 1);
      setNewTitle("");
      setNewPriority("medium");
      setView("all");
    }
  }

  function handleRemoveTask(id) {
    applyTasksResult(removeTask(tasks, id), "המשימה נמחקה.");
  }

  function handleToggleTask(id) {
    applyTasksResult(
      toggleTaskCompleted(tasks, id),
      "סטטוס המשימה עודכן."
    );
  }

  function handlePriorityUpdate(event, id) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selectedPriority = formData.get("priority");

    applyTasksResult(
      updateTaskPriority(tasks, id, selectedPriority),
      "עדיפות המשימה עודכנה."
    );
  }

  const viewTitles = {
    all: "כל המשימות",
    incomplete: "משימות שלא הושלמו",
    search: `תוצאות חיפוש: ${searchedTitle}`
  };

  return (
    <main className="app-shell" dir="rtl">
      <header className="hero">
        <div>
          <h1>Task Manager</h1>
        </div>

      </header>
      <section className="panel read-panel">
        <div className="section-heading">
        </div>

        <div className="read-actions">
          <button
            className={view === "all" ? "button primary" : "button secondary"}
            type="button"
            onClick={showAllTasks}
          >
            הצג את כל המשימות
          </button>

          <button
            className={
              view === "incomplete" ? "button primary" : "button secondary"
            }
            type="button"
            onClick={showIncompleteTasks}
          >
            הצג משימות שלא הושלמו
          </button>

          <button
            className="button secondary"
            type="button"
            onClick={() => setShowCompletedCount(true)}
          >
            ספור משימות שהושלמו
          </button>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <label htmlFor="search-title">חיפוש לפי כותרת מלאה</label>
          <div className="field-row">
            <input
              id="search-title"
              dir="ltr"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search here"
            />
            <button className="button dark" type="submit">
              חפש משימה
            </button>
          </div>
        </form>
    
        {showCompletedCount && (
          <div className="count-card">
            <span>משימות שהושלמו</span>
            {typeof completedCount === "number" ? (
              <strong>{completedCount}</strong>
            ) : (
              <small>השלימו את פונקציית הספירה</small>
            )}
          </div>
        )}
      </section>

      <section className="panel create-panel">


        <form className="create-form" onSubmit={handleAddTask}>
          <div className="field-group grow">
            <label htmlFor="new-title">כותרת המשימה</label>
            <input
              id="new-title"
              dir="ltr"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              placeholder="Type task here"
            />
          </div>

          <div className="field-group">
            <label htmlFor="new-priority">עדיפות</label>
            <select
              id="new-priority"
              value={newPriority}
              onChange={(event) => setNewPriority(event.target.value)}
            >
              <option value="high">גבוהה</option>
              <option value="medium">בינונית</option>
              <option value="low">נמוכה</option>
            </select>
          </div>

          <button className="button primary add-button" type="submit">
            הוסף משימה
          </button>
        </form>
      </section>

      {feedback && <div className="feedback">{feedback}</div>}

      <section className="tasks-section">
        <div className="tasks-heading">
          <div>
            <p className="eyebrow">תוצאה נוכחית</p>
            <h2>{viewTitles[view]}</h2>
          </div>

        </div>

        {!hasValidReadResult ? (
          <div className="empty-state">
            <strong>עדיין אין תוצאה להצגה</strong>
            <p>השלימו את הפונקציה המתאימה באזור התלמידים.</p>
          </div>
        ) : displayedTasks.length === 0 ? (
          <div className="empty-state">
            <strong>
              {view === "search" ? "לא נמצאה משימה בשם זה" : "אין משימות להצגה"}
            </strong>
            <p>
              {view === "search"
                ? "בדקו שהוזנה הכותרת המלאה ושפונקציית החיפוש הושלמה."
                : "נסו לעבור לתצוגה אחרת או להוסיף משימה חדשה."}
            </p>
          </div>
        ) : (
          <div className="task-grid">
            {displayedTasks.map((task) => (
              <article className="task-card" key={task.id}>
                <div className="task-card-top">
                  <span className="task-id">#{task.id}</span>
                  <span
                    className={`status-badge ${
                      task.completed ? "completed" : "open"
                    }`}
                  >
                    {task.completed ? "הושלמה" : "לא הושלמה"}
                  </span>
                </div>

                <h3 dir="ltr">{task.title}</h3>

                <div className={`priority priority-${task.priority}`}>
                  עדיפות {priorityLabels[task.priority] ?? task.priority}
                </div>

                <div className="task-actions">
                  <button
                    className="button small secondary"
                    type="button"
                    onClick={() => handleToggleTask(task.id)}
                  >
                    {task.completed ? "החזר ללא הושלמה" : "סמן כהושלמה"}
                  </button>

                  <form
                    className="priority-form"
                    onSubmit={(event) => handlePriorityUpdate(event, task.id)}
                  >
                    <select name="priority" defaultValue={task.priority}>
                      <option value="high">גבוהה</option>
                      <option value="medium">בינונית</option>
                      <option value="low">נמוכה</option>
                    </select>
                    <button className="button small secondary" type="submit">
                      עדכן עדיפות
                    </button>
                  </form>

                  <button
                    className="button small danger"
                    type="button"
                    onClick={() => handleRemoveTask(task.id)}
                  >
                    מחק משימה
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
