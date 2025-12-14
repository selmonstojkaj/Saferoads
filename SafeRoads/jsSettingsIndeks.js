.header{
            margin-top: 10px;
            margin-bottom: 10px;
        }

        .settings-container {
            max-width: 900px;
            animation: fadeIn 0.4s ease-in-out;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .settings-section {
            background: #fff;
            padding: 28px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            margin-bottom: 24px;
            transition: all 0.3s ease;
            border: 1px solid rgba(0,0,0,0.04);
        }
        
        .settings-section:hover {
            box-shadow: 0 4px 16px rgba(0,0,0,0.12);
            transform: translateY(-2px);
        }
        
        .settings-section h2 {
            margin-top: 0;
            margin-bottom: 24px;
            color: #1e2e38;
            border-bottom: 2px solid #1e88e5;
            padding-bottom: 12px;
            font-size: 20px;
            transition: color 0.3s ease;
        }
        
        .settings-section h2 i {
            margin-right: 10px;
            color: #1e88e5;
        }
        
        .settings-group {
            margin-bottom: 0;
        }
        
        .settings-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 18px 0;
            border-bottom: 1px solid #f0f0f0;
            transition: all 0.2s ease;
        }
        
        .settings-item:hover {
            background-color: #fafbfc;
            margin: 0 -8px;
            padding-left: 8px;
            padding-right: 8px;
            border-radius: 6px;
        }
        
        .settings-item:last-child {
            border-bottom: none;
        }
        
        .settings-label {
            flex: 1;
            padding-right: 20px;
        }
        
        .settings-label h3 {
            margin: 0 0 6px 0;
            font-size: 16px;
            color: #1e2e38;
            font-weight: 600;
            transition: color 0.2s ease;
        }
        
        .settings-label p {
            margin: 0;
            font-size: 13px;
            color: #6b7280;
            line-height: 1.5;
        }
        
        .settings-control {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .toggle-switch {
            position: relative;
            width: 52px;
            height: 28px;
        }
        
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #cbd5e1;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 28px;
        }
        
        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 22px;
            width: 22px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        input:checked + .toggle-slider {
            background-color: #1e88e5;
        }
        
        input:checked + .toggle-slider:before {
            transform: translateX(24px);
        }
        
        .toggle-switch:hover .toggle-slider {
            box-shadow: 0 0 0 4px rgba(30, 136, 229, 0.1);
        }
        
        .settings-input {
            padding: 10px 14px;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            font-size: 14px;
            width: 220px;
            transition: all 0.3s ease;
            background-color: #fff;
        }
        
        .settings-input:hover {
            border-color: #b0b0b0;
        }
        
        .settings-input:focus {
            outline: none;
            border-color: #1e88e5;
            box-shadow: 0 0 0 3px rgba(30, 136, 229, 0.15);
            transform: translateY(-1px);
        }
        
        .settings-select {
            padding: 10px 14px;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            font-size: 14px;
            width: 220px;
            background-color: #fff;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .settings-select:hover {
            border-color: #b0b0b0;
        }
        
        .settings-select:focus {
            outline: none;
            border-color: #1e88e5;
            box-shadow: 0 0 0 3px rgba(30, 136, 229, 0.15);
            transform: translateY(-1px);
        }
        
        .btn-danger {
            background-color: #e53935;
            transition: all 0.3s ease;
        }
        
        .btn-danger:hover {
            background-color: #c62828;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(229, 57, 53, 0.3);
        }
        
        .save-message {
            display: none;
            padding: 14px 18px;
            margin-top: 18px;
            background-color: #e8f5e9;
            border-left: 4px solid #4caf50;
            color: #2e7d32;
            border-radius: 6px;
            font-weight: 500;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-10px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .save-message.show {
            display: block;
        }
        
        .settings-section h2 i {
            transition: transform 0.3s ease;
        }
        
        .settings-section:hover h2 i {
            transform: scale(1.1);
        }
        
        /* Password Modal Professional Design */
        #passwordModal .modal-content {
            max-width: 480px;
            padding: 0;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: modalSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-30px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        #passwordModal .modal-header {
            background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%);
            padding: 24px 28px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        #passwordModal .modal-header h2 {
            margin: 0;
            font-size: 22px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        #passwordModal .modal-header h2 i {
            font-size: 24px;
        }
        
        #passwordModal .close {
            float: none;
            font-size: 22px;
            color: white;
            opacity: 0.9;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            transition: all 0.2s ease;
            cursor: pointer;
            background: rgba(255,255,255,0.1);
        }
        
        #passwordModal .close:hover {
            opacity: 1;
            background: rgba(255,255,255,0.2);
            transform: rotate(90deg);
        }
        
        #passwordModal .modal-body {
            padding: 28px;
            background: #fff;
        }
        
        #passwordForm {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        #passwordForm .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        #passwordForm label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            font-size: 14px;
            color: #1e2e38;
            margin: 0;
        }
        
        #passwordForm label i {
            color: #1e88e5;
            font-size: 16px;
        }
        
        #passwordForm input[type="password"] {
            width: 100%;
            padding: 12px 16px 12px 44px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 15px;
            transition: all 0.3s ease;
            background-color: #fafbfc;
            box-sizing: border-box;
            font-family: Arial, Helvetica, sans-serif;
        }
        
        #passwordForm input[type="password"]:hover {
            border-color: #b0b0b0;
            background-color: #fff;
        }
        
        #passwordForm input[type="password"]:focus {
            outline: none;
            border-color: #1e88e5;
            background-color: #fff;
            box-shadow: 0 0 0 4px rgba(30, 136, 229, 0.1);
            transform: translateY(-1px);
        }
        
        #passwordForm .input-wrapper {
            position: relative;
        }
        
        #passwordForm .input-wrapper i {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: #6b7280;
            font-size: 18px;
            pointer-events: none;
            transition: color 0.3s ease;
        }
        
        #passwordForm input[type="password"]:focus + i,
        #passwordForm .input-wrapper:focus-within i {
            color: #1e88e5;
        }
        
        #passwordForm .password-strength {
            margin-top: 4px;
            height: 4px;
            background: #e0e0e0;
            border-radius: 2px;
            overflow: hidden;
            display: none;
        }
        
        #passwordForm .password-strength.show {
            display: block;
        }
        
        #passwordForm .password-strength-bar {
            height: 100%;
            width: 0%;
            transition: all 0.3s ease;
            border-radius: 2px;
        }
        
        #passwordForm .password-strength-bar.weak {
            width: 33%;
            background: #e53935;
        }
        
        #passwordForm .password-strength-bar.medium {
            width: 66%;
            background: #fb8c00;
        }
        
        #passwordForm .password-strength-bar.strong {
            width: 100%;
            background: #4caf50;
        }
        
        #passwordForm .password-requirements {
            margin-top: 8px;
            font-size: 12px;
            color: #6b7280;
            display: none;
        }
        
        #passwordForm .password-requirements.show {
            display: block;
        }
        
        #passwordForm .password-requirements ul {
            margin: 4px 0 0 0;
            padding-left: 20px;
            list-style: none;
        }
        
        #passwordForm .password-requirements li {
            margin: 4px 0;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        #passwordForm .password-requirements li i {
            font-size: 12px;
        }
        
        #passwordForm .password-requirements li.valid {
            color: #4caf50;
        }
        
        #passwordForm .password-requirements li.invalid {
            color: #6b7280;
        }
        
        #passwordForm .modal-actions {
            display: flex;
            gap: 12px;
            margin-top: 8px;
            padding-top: 20px;
            border-top: 1px solid #eef2f7;
        }
        
        #passwordForm .modal-actions button {
            flex: 1;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
        }
        
        #passwordForm .modal-actions .btn-submit {
            background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%);
            color: white;
            box-shadow: 0 4px 12px rgba(30, 136, 229, 0.3);
        }
        
        #passwordForm .modal-actions .btn-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(30, 136, 229, 0.4);
        }
        
        #passwordForm .modal-actions .btn-submit:active {
            transform: translateY(0);
        }
        
        #passwordForm .modal-actions .btn-cancel {
            background: #f5f7fb;
            color: #6b7280;
            border: 1px solid #e0e0e0;
        }
        
        #passwordForm .modal-actions .btn-cancel:hover {
            background: #eef2f7;
            color: #1e2e38;
            border-color: #cbd5e1;
        }
        
        #passwordModal .modal-backdrop {
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(4px);
}


