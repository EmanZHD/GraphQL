
/* Update your CSS with these styles */
.dashboard-card.income-summary {
    display: flex;
    /* flex-direction: column; */
    justify-content: space-between;
    padding: 0;
    /* Remove default padding */
}

.income-summary .section {
    writing-mode: vertical-rl;
    /* Vertical text */
    transform: rotate(180deg);
    /* Rotate to read bottom-to-top */
    text-orientation: mixed;
    padding: 20px 10px;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.income-summary .section:last-child {
    border-right: none;
}

/* Specific section styles */
.income-summary .section.total {
    background: rgba(0, 98, 249, 0.2);
    /* Blue tint */
}

.income-summary .section.audit {
    background: rgba(76, 175, 80, 0.2);
    /* Green tint */
}

.income-summary .section.project {
    background: rgba(255, 152, 0, 0.2);
    /* Orange tint */
}

.income-summary .section.level {
    background: rgba(156, 39, 176, 0.2);
    /* Purple tint */
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .dashboard-card.income-summary {
        flex-direction: row;
        overflow-x: auto;
    }

    .income-summary .section {
        writing-mode: horizontal-tb;
        transform: none;
        border-right: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        min-width: 150px;
    }
}
