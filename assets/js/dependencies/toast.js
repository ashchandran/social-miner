/**
 * Toast - Toast Controller Class
 * @param {Node} containerEle - DOM Container element
 * @param {Object} options - Toast options
 * @param {String} [options.message] - Toast default message
 * @param {Number} [options.timeout] - Toast default timeout
 * @param {Boolean} [options.logging] - Toast default logging option
 * @param {String} [options.gravity] - Toast default gravity
 */
function ToastContainer(options) {
  // TODO : Gravity (add to comments the options and impliment)
  // TODO : Remove styles from css if possible
  // Append Toast container to page
  var containerTopEle = document.createElement("div");
  containerTopEle.id = "toast-container-top";
  document.body.appendChild(containerTopEle);
  
  var containerBottomEle = document.createElement("div");
  containerBottomEle.id = "toast-container-bottom";
  document.body.appendChild(containerBottomEle);

  this.topToastContainerEle = containerTopEle;
  this.bottomToastContainerEle = containerBottomEle;
  this.message = options.message || "Something went wrong, Try Again";
  this.timeout = options.timeout || 10000;
  this.logging = options.logging || false;
  this.gravity = options.gravity || 'top';
}
/**
 * Show Toast
 * @param {String} [msg] Toast Message
 * @param {Object} [options] Individual Toast options to override the defaults
 * @param {Function} [callback]
 */
ToastContainer.prototype.toast = function (msg, options, callback) {

    // Options
    var m     = msg || this.message;
    var t     = (options && options.timeout) ? options.timeout : this.timeout;
    var g     = (options && options.gravity) ? options.gravity : this.gravity;
    var log   = (options && typeof options.logging !== 'undefined') ? options.logging : this.logging;

    // Create HTML
    var containerEle = (g === "top") ? this.topToastContainerEle : this.bottomToastContainerEle;
    var toastEle = document.createElement("div");
    toastEle.classList.add("simple-toast");
    toastEle.innerHTML = m;
    toastEle.classList.add(g);
    containerEle.appendChild(toastEle);

    // Slide in toast
    setTimeout(function() {
        toastEle.classList.add("show");
    }, 500);

    // Slide out toast
    setTimeout(function() {
        toastEle.classList.remove("show");
    }, t+500);

    // Remove from DOM
    setTimeout(function() {
        containerEle.removeChild(toastEle);
    }, t+700);

    // Log Error
    if (log) {
      console.log(m);
    }

    if (callback) {
      return callback(null, m);
    }
}