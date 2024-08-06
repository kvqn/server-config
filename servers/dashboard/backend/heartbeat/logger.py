from friday import Logger
from common.args import get_args
import logging


class PrettyFormatter(logging.Formatter):

    def __init__(self, style_level: bool = True, style_message: bool = True):
        super().__init__()

        yellow = "\033[33;20m"
        blue = "\033[0;34m"
        red = "\033[0;31m"
        bold_red = "\033[1;31m"
        reset = "\033[0m"

        debug = "[ DBUG ]"
        info = "[ INFO ]"
        error = "[ ERRO ]"
        warning = "[ WARN ]"
        critical = "[ CRIT ]"

        style_debug = ""
        style_info = blue
        style_warning = yellow
        style_error = red
        style_critical = bold_red

        message = " [%(name)s] %(message)s"

        if style_level and style_message:
            fmt_debug = style_debug + debug + message + reset
            fmt_info = style_info + info + message + reset
            fmt_warning = style_warning + warning + message + reset
            fmt_error = style_error + error + message + reset
            fmt_critical = style_critical + critical + message + reset

        elif style_level and not style_message:
            fmt_debug = style_debug + debug + reset + message
            fmt_info = style_info + info + reset + message
            fmt_warning = style_warning + warning + reset + message
            fmt_error = style_error + error + reset + message
            fmt_critical = style_critical + critical + reset + message

        elif not style_level and style_message:
            fmt_debug = debug + style_debug + message + reset
            fmt_info = info + style_info + message + reset
            fmt_warning = warning + style_warning + message + reset
            fmt_error = error + style_error + message + reset
            fmt_critical = critical + style_critical + message + reset

        else:
            fmt_debug = debug + message
            fmt_info = info + message
            fmt_warning = warning + message
            fmt_error = error + message
            fmt_critical = critical + message

        self.FORMATTERS = {
            logging.DEBUG: logging.Formatter(fmt=fmt_debug),
            logging.INFO: logging.Formatter(fmt=fmt_info),
            logging.WARNING: logging.Formatter(fmt=fmt_warning),
            logging.ERROR: logging.Formatter(fmt=fmt_error),
            logging.CRITICAL: logging.Formatter(fmt=fmt_critical),
        }

    def format(self, record):
        log_fmt = self.FORMATTERS.get(record.levelno)
        formatter = log_fmt if log_fmt else self.FORMATTERS[logging.INFO]
        return formatter.format(record)


args = get_args()

logger = Logger(
    name="heartbeat",
    endpoint=args.friday.endpoint,
    namespace=args.friday.namespace,
    topic=args.friday.topic,
)

stream_handler = logging.StreamHandler()
stream_handler.setFormatter(PrettyFormatter())

logger.addHandler(stream_handler)
