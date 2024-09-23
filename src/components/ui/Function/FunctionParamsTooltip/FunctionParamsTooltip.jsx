import Tooltip from "../../Tooltip/Tooltip";
import "./FunctionParamsTooltip.css";

function FunctionParamsTooltip({ show, func, className = "" }) {
	return (
		<Tooltip
			show={show}
			className={`functionParamsTooltip${className !== "" ? ` ${className}` : ""}`}
			onClick={(e) => e.stopPropagation()}
		>
			<div className="functionParamsTooltip__container">
				{func.type === "const" && (
					<>
						<div className="functionParamsTooltip__row">
							<span className="functionParamsTooltip__row__property">Const:</span>
							<span title={func.constValue} className="functionParamsTooltip__row__value">
								{func.constValue}
							</span>
						</div>
					</>
				)}
				{func.type === "linear" && (
					<>
						<div className="functionParamsTooltip__row">
							<span className="functionParamsTooltip__row__property">Slope:</span>
							<span title={func.slope} className="functionParamsTooltip__row__value">
								{func.slope}
							</span>
						</div>
					</>
				)}
				{func.type === "sine" && (
					<>
						<div className="functionParamsTooltip__row">
							<span className="functionParamsTooltip__row__property">Frequency:</span>
							<span title={func.frequency} className="functionParamsTooltip__row__value">
								{func.frequency} Hz
							</span>
						</div>
						<div className="functionParamsTooltip__row">
							<span className="functionParamsTooltip__row__property">Amplitude:</span>
							<span title={func.amplitude} className="functionParamsTooltip__row__value">
								{func.amplitude}
							</span>
						</div>
						<div className="functionParamsTooltip__row">
							<span className="functionParamsTooltip__row__property">Phase:</span>
							<span title={func.phase} className="functionParamsTooltip__row__value">
								{func.phase}&deg;
							</span>
						</div>
					</>
				)}
				{func.type === "step" && (
					<>
						<div className="functionParamsTooltip__row">
							<span className="functionParamsTooltip__row__property">Step value:</span>
							<span title={func.stepValue} className="functionParamsTooltip__row__value">
								{func.stepValue}
							</span>
						</div>
						<div className="functionParamsTooltip__row">
							<span className="functionParamsTooltip__row__property">Step time:</span>
							<span title={func.stepTime} className="functionParamsTooltip__row__value">
								{func.stepTime} s
							</span>
						</div>
					</>
				)}
				{func.type === "ramp-up" && (
					<>
						<div className="functionParamsTooltip__row">
							<span className="functionParamsTooltip__row__property">Ramp start:</span>
							<span title={func.rampStartTime} className="functionParamsTooltip__row__value">
								{func.rampStartTime} s
							</span>
						</div>
						<div className="functionParamsTooltip__row">
							<span className="functionParamsTooltip__row__property">Ramp end:</span>
							<span title={func.rampEndTime} className="functionParamsTooltip__row__value">
								{func.rampEndTime} s
							</span>
						</div>
						<div className="functionParamsTooltip__row">
							<span className="functionParamsTooltip__row__property">Slope:</span>
							<span title={func.slope} className="functionParamsTooltip__row__value">
								{func.slope}
							</span>
						</div>
					</>
				)}
				{func.type !== "const" && (
					<div className="functionParamsTooltip__row">
						<span className="functionParamsTooltip__row__property">Offset:</span>
						<span title={func.offset} className="functionParamsTooltip__row__value">
							{func.offset}
						</span>
					</div>
				)}
				<div className="functionParamsTooltip__row">
					<span className="functionParamsTooltip__row__property">Start:</span>
					<span title={func.startTime} className="functionParamsTooltip__row__value">
						{func.startTime} s
					</span>
				</div>
				<div className="functionParamsTooltip__row">
					<span className="functionParamsTooltip__row__property">Length:</span>
					<span title={func.length} className="functionParamsTooltip__row__value">
						{func.length} s
					</span>
				</div>
			</div>
		</Tooltip>
	);
}

export default FunctionParamsTooltip;
