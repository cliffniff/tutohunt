import * as React from "react";
import "../styles/modal.css";

export interface ModalProps {
    title: string;
    description?: string;
    buttonOk?: { text: string; callback: () => void };
    buttonCancel?: { text: string; callback: () => void };
}

const Modal: React.FC<ModalProps> = ({
    title,
    description,
    buttonOk,
    buttonCancel,
    children,
}) => {
    return (
        <div className="modal-background">
            <div className="modal-wrapper">
                <div className="modal-title">{title}</div>
                {description && (
                    <div className="modal-description">{description}</div>
                )}
                {children && <div className="modal-children">{children}</div>}
                <div className="modal-buttons">
                    <button
                        className="modal-button-ok"
                        onClick={buttonOk?.callback}>
                        {buttonOk?.text || "Ok"}
                    </button>
                    {buttonCancel && (
                        <button
                            className="modal-button-cancel"
                            onClick={buttonCancel.callback}>
                            {buttonCancel.text}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
