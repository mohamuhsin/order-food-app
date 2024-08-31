import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp.js";

const requestConfig = {};

export default function Meals() {
    const {
        data: loadedMeals,
        error,
        isLoading,
    } = useHttp("http://localhost:3000/meals", requestConfig, []);

    if (isLoading) {
        return <p className="center">Fetching Meals ...</p>;
    }

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}
