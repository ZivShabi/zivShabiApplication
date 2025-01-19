function PageHeader({ title, description, className }) {
    return (
        <div className={`page-header ${className || ''}`}>
            <h1>{title}</h1>
            <h5>{description}</h5>
        </div>
    );
}
export default PageHeader;
