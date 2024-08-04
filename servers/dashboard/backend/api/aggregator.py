from friday import Aggregator
from common.args import get_args

args = get_args()

aggregator = Aggregator(args.friday.endpoint)
