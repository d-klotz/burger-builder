export const updateObject = (oldObject, updatedproperties) => {
    return {
        ...oldObject,
        ...updatedproperties
    };
};