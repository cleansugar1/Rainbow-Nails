// Request an appointment: service picker, time estimate, calendar, time slots, Formspree submit.
(function () {
  var form = document.getElementById('book-form');
  if (!form) return;

  var OPEN = 9 * 60;     // 9:00 am
  var CLOSE = 19 * 60;   // 7:00 pm, appointments must finish by closing
  var STEP = 30;         // minutes between start times
  var MONTHS_AHEAD = 2;  // how far ahead people can pick

  var boxes = Array.prototype.slice.call(form.querySelectorAll('.svc-option input'));
  var estValue = document.getElementById('est-value');
  var estList = document.getElementById('est-list');
  var calLabel = document.getElementById('cal-label');
  var calDays = document.getElementById('cal-days');
  var prevBtn = document.getElementById('cal-prev');
  var nextBtn = document.getElementById('cal-next');
  var timeSel = document.getElementById('f-time');
  var dayLabel = document.getElementById('day-label');
  var errBox = document.getElementById('form-error');
  var submitBtn = document.getElementById('f-submit');

  // "Now" in Hawaii time, so slots are right no matter where the visitor's device is set.
  function hawaiiNow() { return new Date(new Date().toLocaleString('en-US', { timeZone: 'Pacific/Honolulu' })); }
  var now = hawaiiNow();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var monthOffset = 0;
  var picked = null; // Date

  function fmtTime(m) { var h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? 'pm' : 'am', h12 = h % 12 || 12; return h12 + ':' + (mm < 10 ? '0' : '') + mm + ' ' + ap; }
  function fmtDur(m) { var h = Math.floor(m / 60), r = m % 60; if (!h) return r + ' min'; return h + ' hr' + (r ? ' ' + r + ' min' : ''); }
  function fmtDay(d, long) { return d.toLocaleDateString('en-US', long ? { weekday: 'long', month: 'long', day: 'numeric' } : { weekday: 'short', month: 'short', day: 'numeric' }); }

  function selected() { return boxes.filter(function (b) { return b.checked; }); }
  function total() { return selected().reduce(function (s, b) { return s + Number(b.dataset.min || 0); }, 0); }

  function renderEstimate() {
    var sel = selected(), t = total();
    estValue.textContent = t ? 'About ' + fmtDur(t) : 'Pick a service';
    estList.textContent = sel.length ? sel.map(function (b) { return b.value; }).join(' + ') : 'Nothing selected yet';
  }

  function renderCalendar() {
    var first = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    calLabel.textContent = first.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    prevBtn.disabled = monthOffset <= 0;
    nextBtn.disabled = monthOffset >= MONTHS_AHEAD;
    calDays.innerHTML = '';
    for (var i = 0; i < first.getDay(); i++) {
      var blank = document.createElement('span'); blank.className = 'cal-blank'; calDays.appendChild(blank);
    }
    var nd = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    for (var d = 1; d <= nd; d++) {
      (function (dt) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'cal-day'; b.textContent = dt.getDate();
        b.setAttribute('aria-label', fmtDay(dt, true));
        var isPicked = picked && dt.getTime() === picked.getTime();
        b.setAttribute('aria-pressed', isPicked ? 'true' : 'false');
        if (dt < today) b.disabled = true;
        b.addEventListener('click', function () { picked = dt; hideError(); renderCalendar(); renderTimes(); });
        calDays.appendChild(b);
      })(new Date(first.getFullYear(), first.getMonth(), d));
    }
  }

  function renderTimes() {
    var t = total(), keep = timeSel.value;
    timeSel.innerHTML = '';
    dayLabel.textContent = picked ? ' · ' + fmtDay(picked) : '';
    function opt(v, label) { var o = document.createElement('option'); o.value = v; o.textContent = label; timeSel.appendChild(o); }
    if (!t) { opt('', 'Pick a service first'); return; }
    if (!picked) { opt('', 'Pick a day first'); return; }
    var start = OPEN;
    if (picked.getTime() === today.getTime()) {
      var n = hawaiiNow(); start = Math.max(OPEN, Math.ceil((n.getHours() * 60 + n.getMinutes() + 30) / STEP) * STEP);
    }
    var count = 0;
    opt('', 'Choose a start time');
    for (var s = start; s + t <= CLOSE; s += STEP) { opt(fmtTime(s), fmtTime(s) + ' – ' + fmtTime(s + t)); count++; }
    if (!count) { timeSel.innerHTML = ''; opt('', 'No times left that day, try another'); return; }
    if (keep && Array.prototype.some.call(timeSel.options, function (o) { return o.value === keep; })) timeSel.value = keep;
  }

  function showError(msg) { errBox.textContent = msg; errBox.hidden = false; }
  function hideError() { errBox.hidden = true; }

  boxes.forEach(function (b) { b.addEventListener('change', function () { hideError(); renderEstimate(); renderTimes(); }); });
  prevBtn.addEventListener('click', function () { if (monthOffset > 0) { monthOffset--; renderCalendar(); } });
  nextBtn.addEventListener('click', function () { if (monthOffset < MONTHS_AHEAD) { monthOffset++; renderCalendar(); } });
  timeSel.addEventListener('change', hideError);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim(), phone = form.elements.phone.value.trim();
    if (!total()) return showError('Pick at least one service.');
    if (!picked) return showError('Pick a day on the calendar.');
    if (!timeSel.value) return showError('Choose a start time.');
    if (!name || phone.replace(/\D/g, '').length < 7) return showError('Add your name and a phone number so we can confirm.');

    var services = selected().map(function (b) { return b.value; }).join(' + ');
    document.getElementById('f-services').value = services;
    document.getElementById('f-estimate').value = 'About ' + fmtDur(total());
    document.getElementById('f-date').value = fmtDay(picked, true);
    document.getElementById('f-subject').value = 'Appointment request: ' + name + ', ' + fmtDay(picked) + ' at ' + timeSel.value;

    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      return showError('Online requests aren’t connected yet. Please call us at (808) 735-1751.');
    }

    submitBtn.disabled = true; submitBtn.textContent = 'Sending…';
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error('bad'); return r; })
      .then(function () {
        document.getElementById('sent-summary').textContent = services + ', ' + fmtDay(picked, true) + ' at ' + timeSel.value + '.';
        form.hidden = true;
        var card = document.getElementById('sent-card'); card.hidden = false; card.focus();
      })
      .catch(function () {
        submitBtn.disabled = false; submitBtn.textContent = 'Send request';
        showError('Something went wrong sending your request. Please try again or call us at (808) 735-1751.');
      });
  });

  renderEstimate(); renderCalendar(); renderTimes();
})();
