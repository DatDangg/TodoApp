function ModalConfirm({ show, onConfirm, onCancel, message }) {
    if (!show) return null;
  
    return (
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
        justifyContent: "center", alignItems: "center", zIndex: 1000
      }}>
        <div style={{
          backgroundColor: "white", padding: "20px", borderRadius: "8px", minWidth: "300px"
        }}>
          <h3>Confirm</h3>
          <p>{message}</p>
          <button onClick={onConfirm} style={{ marginRight: "10px" }}>Đồng ý</button>
          <button onClick={onCancel}>Hủy</button>
        </div>
      </div>
    );
  }
  
  export default ModalConfirm;
  