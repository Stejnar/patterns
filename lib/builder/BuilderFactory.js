
/**
 * @param {Function} Model
 * @param {string[]} keys
 * @return {Builder}
 * @constructor
 */
exports.BuilderFactory = function (Model, keys) {
    function Builder(c_model) {
        for (let key in c_model) {
            if (c_model.hasOwnProperty(key)) {
                this[key] = c_model[key];
            }
        }
        keys.forEach((key) => {
            const builderKey = 'with' + capitalize(key);
            this[builderKey] = (value) => {
                this[key] = value;
                return this;
            };
        });
        this.build = () => {
            return new Model(this);
        };
    }
    return Builder;
};

/**
 *
 * @param key
 * @return {string} - capitalized key
 */
function capitalize(key) {
    return key[0].toUpperCase() + key.substr(1, key.length);
}