import "../../../css/DescriptionOfReferences.css"; // קובץ CSS מותאם אישית
function DescriptionOfReferencesInProject() {
    return (
        <div className="project-description container">
            <h1 className="title">📌 תיאור אפשרויות בפרויקט</h1>

            <section className="section">
                <h2>🔹 הרשמה לאתר</h2>
                <p>
                    ניתן לבחור אם ברצונך להיות משתמש <strong>פרטי</strong> או <strong>עסקי</strong>.<br />
                    יש ללחוץ ואז להסיר את הסימון כדי לבחור משתמש פרטי.
                </p>
            </section>

            <section className="section">
                <h2>📢 פוסטים</h2>
                <p>
                    ניתן להעלות תמונה <strong>בעת יצירת פוסט</strong> או <strong>לערוך פוסט קיים</strong>.<br />
                    <i className="bi bi-box-arrow-in-up"></i> לחץ על הסמל כדי לבחור תמונה.<br />
                    <span className="text-danger">❌ לא ניתן להעלות תמונה ללא טקסט!</span>
                </p>
                <p>
                    <i className="bi bi-mic"></i> ניתן להוסיף הודעה קולית על ידי לחיצה.<br />
                    <i className="bi bi-headphones"></i> להשמעת ההודעה הקולית - לחץ והחזק.<br />
                    🔄 אם יש יותר מהודעה אחת, הן יוצגו בטבלה.<br />
                    ⚠️ <span className="text-warning">אסור להשתמש במילים פוגעניות בעברית או באנגלית.</span>
                </p>
            </section>

            <section className="section">
                <h2>💬 הודעות</h2>
                <p>
                    <i className="bi bi-mic"></i> ניתן לשלוח הודעה קולית בלחיצה על הסמל.<br />
                    <i className="bi bi-headphones"></i> להשמעה - לחץ והחזק.<br />
                    🔄 אם יש יותר מהודעה אחת, הן יוצגו בטבלה.<br />
                </p>
            </section>
        </div>
    );
}

export default DescriptionOfReferencesInProject;
