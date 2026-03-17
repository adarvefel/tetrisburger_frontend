import "./loadingSpinner.css"

export default function LoadingSpinner() {
    return (
        <div className="loadingSpinner">
            <div className="loadingSpinner__spinner"></div>
            <p className="loadingSpinner__p">Cargando...</p>
        </div>
    )
}