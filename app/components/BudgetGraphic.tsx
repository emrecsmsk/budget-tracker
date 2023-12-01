"use client"

import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useTranslation } from "react-i18next";
import '../i18n'

interface BudgetGraphicProps {
    expenses: [ExpenseModel]
}

const BudgetGraphic: React.FC<BudgetGraphicProps> = ({ expenses }) => {

    const { t } = useTranslation()
    const [income, setIncome] = useState(0)
    const [outcome, setOutcome] = useState(0)

    useEffect(() => {
        const calculateBudget = () => {
            var income = 0
            var outcome = 0

            if (expenses !== undefined) {
                expenses.forEach((expense) => {
                    if (expense.type === "Income") {
                        income += expense.moneyAmount
                    } else {
                        outcome += expense.moneyAmount
                    }
                })
            }
            setIncome(income)
            setOutcome(outcome)
        }
        calculateBudget()
    }, [expenses])

    const options = {
        is3D: true,
        colors: [
            "#EC8F5E",
            "#FFD28F"
        ]
    }

    return (
        <div
            className="p-2 flex justify-center rounded-[10px] w-full shadow-md bg-white "
        >
            {
                income &&
                <Chart
                    chartType="PieChart"
                    data={[
                        ["Budget", "Money"],
                        [t('income'), income],
                        [t('outcome'), outcome],
                    ]}
                    options={options}
                    width={"100%"}
                    height={"400px"}
                />
            }
        </div>
    )
}

export default BudgetGraphic